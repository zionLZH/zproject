/**
 * ============================
 * 
 * Config Start
 * 
 * ============================
 */
let Config = {
    js: {
        typescript: false,
    },
    css: {
        less: false,
        sass: false
    },
    html: {
        ejs: true
    },
    min: {
        js: true,
        css: true,
        image: true,
    },
    version: {
        enable: true,
        mark: 'v',
        calc: 'Date' || 'Random'
    },
    webServer: {
        enable: true,
        sync: true,
        port: 9000
    }
}
let ejsData ={
    title: 'Hello',
}
/**
 * ============================
 * 
 * Config End
 * 
 * ============================
 */

// Gulp
const gulp = require('gulp');
// Javascript
const babel = require('gulp-babel')
const jsMin = require('gulp-uglify')
const tsc = require('gulp-typescript')
// Css
const cssMin = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
// Html
const ejs = require('gulp-ejs')
const replace = require('gulp-replace')
// Other
const fs = require('fs')
const fpath = require('path')
const watch = require('gulp-watch')
const rename = require('gulp-rename')
const imgMin = require('gulp-imagemin')
// browserSync
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
console.clear()

/**
 * 
 * Web Server
 * 
 */
if(Config.webServer.enable){
    let express = require('express')
    let server = express()
    server.use(express.static('build'))
    server.listen(Config.webServer.port, ()=>{
        console.log('\x1B[32m',`WebServer: http://127.0.0.1:${Config.webServer.port}/`)
    })
    browserSync.init({
        proxy: `http://127.0.0.1:${Config.webServer.port}/`,
        ghostMode: Config.webServer.sync
    });
}

/**
 * 
 * Gulp Tasks
 * 
 */

var path = 'project/**/**/**/**'
gulp.task('default',['js','css','image','html'], ()=>{
    // Js
    gulp.watch([`${path}.js`,`${path}.ts`], ['js'])
    // Css
    gulp.watch(`${path}.css`,['css'])
    // Html
    gulp.watch([`${path}.html`,`${path}.ejs`], ['html'])
    // Image
    gulp.watch([`${path}.png`,`${path}.jpg`,`${path}.jpeg`, `${path}.gif`], ['image'])
    // File
    watch(path).on('add',(file)=>{
        gulp.src(file)
            .pipe(gulp.dest('build'))
            .pipe(reload({stream: true}))
    }).on('unlink', (file)=>{
        let buildFile = './build/' + fpath.relative('./project', file);
        fs.existsSync(buildFile) && fs.unlink(buildFile);
    })
})

gulp.task('js', ()=>{
    let src = gulp.src(`${path}.js`);
        src = src.pipe(babel())
    if(Config.js.typescript){
        src = src.pipe(tsc())
    }
    if(Config.min.js){
        src = src.pipe(jsMin())
    }
    src.pipe(rename({suffix: '.js'}))
        .pipe(gulp.dest('build'))
        .pipe(reload({stream: true}))

})

gulp.task('css', ()=>{
    let src = gulp.src(`${path}.css`)
        src = src.pipe(autoprefixer())
        if(Config.min.css){
            src = src.pipe(cssMin())
        }
        src.pipe(gulp.dest('build'))
           .pipe(reload({stream: true}))

})

gulp.task('image', ()=>{
    if(!Config.min.image)return;
    gulp.src([`${path}.png`,`${path}.jpg`,`${path}.jpeg`, `${path}.gif`])
        .pipe(imgMin())
        .pipe(gulp.dest('build'))
        .pipe(reload({stream: true}))
})

switch (Config.version.calc) {
    case 'Date':
        let date = new Date()
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDay()
        var tmpStr = y + '' + ((m<10)?'0'+m:m) + '' + ((d<10)?'0'+d:d)
        Config.version.mark = Config.version.mark + '=' + tmpStr
        break;
    case 'Random':
        var tmpStr = parseInt(Math.random()*100000000)
        Config.version.mark = Config.version.mark + '=' + tmpStr
        break;
    default:
        break;
}
gulp.task('html', ()=>{
    let src = gulp.src(`${path}.html`)
    if(Config.version.enable){
        src   =  src.pipe(replace(/(\.js\?)/gi,`.js?${Config.version.mark}&`))
                    .pipe(replace(/(\.js\')/gi,`.js?${Config.version.mark}\'`))
                    .pipe(replace(/(\.js\")/gi,`.js?${Config.version.mark}\"`))
                    .pipe(replace(/(\.css\?)/gi,`.css?${Config.version.mark}&`))
                    .pipe(replace(/(\.css\')/gi,`.css?${Config.version.mark}\'`))
                    .pipe(replace(/(\.css\")/gi,`.css?${Config.version.mark}\"`))
    }
    if(Config.html.ejs){
        src = src.pipe(ejs(ejsData).on('error',(err)=>{
            console.error(err.message)
        }))
    }
    src.pipe(gulp.dest('build'))
       .pipe(reload({stream: true}))
})



