const babel = require('gulp-babel')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const gnotify = require('gulp-notify')
const browserify = require('gulp-bro')
const touch = require('gulp-touch-cmd')
const merge = require('merge-stream')
const argv = require('../../lib/argv')
const isEnabled = require('../../lib/isEnabled.js')(argv.env)
const replaceEnv = require('../../lib/replaceEnv.js')(argv.env)

module.exports = (name, gulp, config, paths) => {
	gulp.task(name, () => {
		let stream

		for (let dest in paths) {
			const source = paths[dest]
			dest = replaceEnv(dest)

			const file = dest.replace(/^.*[\\/]/, '')
			const isFile = file.length > 0

			if (isFile) {
				dest = dest.replace(file, '')
			}

			let buffer = gulp.src(source, { allowEmpty: true })

			if (isEnabled(config.sourcemaps.enabled)) {
				buffer = buffer.pipe(sourcemaps.init())
			}

			if (isEnabled(config.browserify.enabled)) {
				buffer = buffer.pipe(
					browserify().on(
						'error',
						gnotify.onError({
							message: 'Error: <%= error.message %>',
							emitError: true
						})
					)
				)
			}

			if (isFile) {
				buffer = buffer.pipe(concat(file))
			}

			if (isEnabled(config.babeljs.enabled)) {
				buffer = buffer.pipe(
					babel(config.babeljs.config).on(
						'error',
						gnotify.onError({
							message: 'Error: <%= error.message %>',
							emitError: true
						})
					)
				)
			}

			if (isEnabled(config.sourcemaps.enabled)) {
				buffer = buffer.pipe(sourcemaps.write('.'))
			}

			buffer = buffer.pipe(gulp.dest(dest)).pipe(touch()).on(
				'error',
				gnotify.onError({
					message: 'Error: <%= error.message %>',
					emitError: true
				})
			)

			if (stream === undefined) {
				stream = buffer
			} else {
				stream = merge(stream, buffer)
			}
		}

		return stream
	})
}
