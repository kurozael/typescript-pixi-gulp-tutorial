// Import gulp, our gulp-typescript library, and the fs (file system) package.
var gulp = require("gulp");
var tsc = require("gulp-typescript");
var fs = require("fs");

// Create a TypeScript project using the tsconfig.json at the root of your project.
var project = tsc.createProject("tsconfig.json");

// This defines a new gulp task, we'll call our build task, `build` because it makes sense.
gulp.task("build", function(done) {
	// Define an array of source file locations. We'll just use every .ts file in src/.
    var gameSrc = ["src/**/**.ts"];
	
	var builder = gulp.src(gameSrc)
	// Build the project using our TypeScript project defined above.
    .pipe(project())
	// Grab the outputted .js for the current file we're building.
    .js
	// Throw it into our build/ directory.
    .pipe(gulp.dest("build/"));
	
	// Return the builder, the task will finish when it's done!
	return builder;
});

// Import the browserify package. Put this at the top with your other `require` statements.
var browserify = require("browserify");

// Import the source stream and buffer packages.
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

// Define the `bundle` task. The `["build"]` bit tells Gulp that you want that task to run first!
gulp.task("bundle", ["build"], function(done) {
	var outputFolder = "release/";
	var outputFileName = "js/app.js";
	var mainTsFilePath = "build/main.js";
	
    var bundler = browserify({
		paths: ["./build"],
		debug: false,
		standalone: outputFileName
    });

	// Add the main.ts file to the bundler and start bundling now...
    var output = bundler.add(mainTsFilePath).bundle()
	// Specify our target output file name...
	.pipe(source(outputFileName))
	.pipe(buffer())
	// Specify out output folder.
	.pipe(gulp.dest(outputFolder));
	
	// Return the output so that the task will finish when it's done.
	return output;
});


// Import the browser-sync package. Put this at the top with your other `require` statements.
// The browser-sync package will let you spin up a web server easily.
var browserSync = require("browser-sync");

// Define the `serve` task. The `["bundle"]` bit tells Gulp that you want that task to run first!
gulp.task("serve", ["bundle"], function(done) {
	var outputFolder = "release/";
	
	// Spin up the server from our release/ directory.
	// You can read the BrowserSync documentation for more information about these options.
	browserSync.init({
		server: {
			baseDir: outputFolder
		},
		codeSync: false,
		online: true,
		cors: true
	});
	
	// Tell our Gulp task that we're done, we don't return a stream here like the other tasks.
	done();
});