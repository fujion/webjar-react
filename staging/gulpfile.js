const {src, dest, series} = require('gulp');
const rename = require('gulp-rename');

const srcDir = '${webjar.staging}/node_modules/';
const destDir = '${webjar.target}/';

function task1() {
    return _copy(['react/*.md', 'react/LICENSE']);
}

function task2() {
    return _copy('react/umd/react.development.js', 'dist', path => path.basename = 'react');
}

function task3() {
    return _copy('react/umd/react.production.min.js', 'dist', path => path.basename = 'react.min');
}

function task4() {
    return _copy('react-dom/umd/react-dom.development.js', 'dist', path => path.basename = 'react-dom');
}

function task5() {
    return _copy('react-dom/umd/react-dom.production.min.js', 'dist', path => path.basename = 'react-dom.min');
}

function _toSrc(_src) {
    return src(_src, {allowEmpty: false, cwd: srcDir});
}

function _toDest(_dest) {
    return dest(_dest || '.', {cwd: destDir});
}

function _copy(_src, _dest, _rename) {
    console.log('  Copying ' + _src);

    if (_rename) {
        return _toSrc(_src).pipe(rename(_rename)).pipe(_toDest(_dest))
    } else {
        return _toSrc(_src).pipe(_toDest(_dest))
    }
}

exports.default = series(task1, task2, task3, task4, task5);
