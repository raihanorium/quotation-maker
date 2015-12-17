module.exports = function(grunt) {
	// include required plugins
	grunt.loadNpmTasks('grunt-contrib-connect');

	// task configuration
	var tasks = {
		// load package data in pkg variable
		pkg: grunt.file.readJSON('package.json'),

		// describe connect, the start of the app in a http server
		connect: {
			server: {
				options: {
					port: 9001,
					base: '',
					keepalive: true
				}
			}
		}
	};

	// init configuration
	grunt.initConfig(tasks);


	// register watch task
	grunt.registerTask('watch', ['connect']);

	// register the default task
	grunt.registerTask('default', ['watch']);
}