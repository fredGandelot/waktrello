var minimist = require('minimist'),
    del = require('del'),
    fse = require('fs-extra')
    ;
    
var defaultOptions = {
  default: {
    buildFolderName: 'dist'
  }
};

var options = minimist(process.argv.slice(2), defaultOptions);

if(! options.buildPath) {
    console.error('buildPath param is required.');
    return;
}

if(! options.projectPath) {
    console.error('projectPath param is required.');
    return;
}

function bundle() {
  fse.readdir(options.projectPath, function (err, files) {
    files.forEach(function (file) {
      if(file === 'mobile') {
        return;
      }
      
      if(file === 'web') {
        fse.copy(options.projectPath + '/web/' + options.buildFolderName, options.buildPath + '/web');
        
      } else if(file === 'backend') {
        fse.readdir(options.projectPath + '/backend', function (_err, _files) {
          _files.forEach(function (_file) {
            if (_file !== 'data') {
              fse.copy(options.projectPath + '/backend/' + _file, options.buildPath + '/backend/' + _file);
            }
          });
        });        
      } else {
        fse.copy(options.projectPath + '/' + file, options.buildPath + '/' + file);
      }
    });
  });
}

function clean() {
  return del.sync([
    options.buildPath + '/**/*',
    '!' + options.buildPath + '/.git' // delete all files/folders except .git folder
  ], { force: true });
}

clean();
bundle();
