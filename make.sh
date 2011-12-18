#!/usr/bin/env bash

INDEX=index.html
BASEDIR=_site

rm -rf $BASEDIR
mkdir -p $BASEDIR

jsflag=0
lessflag=0
templateflag=0
echo "Gathering JS and LESS and processing templates..."
while read line; do
    if [ "$line" == "[/JS]" ]; then
        jsflag=0
    elif [ $jsflag == 1 ]; then
        if [ "$line" != "" ]; then
            echo "    Including JS $line"
            cat js/$line.js >> _site/js.big.js
        fi
    elif [ "$line" == "[JS]" ]; then
        jsflag=1
        echo "<script type='text/javascript' src='js.js'></script>" >> _site/index.html
    elif [ "$line" == "[/LESS]" ]; then
        lessflag=0
    elif [ $lessflag == 1 ]; then
        if [ "$line" != "" ]; then
            echo "    Including LESS $line"
            cat less/$line.less >> _site/less.less
        fi
    elif [ "$line" == "[LESS]" ]; then
        lessflag=1
        echo "<link href='css.css' rel='stylesheet' type='text/css'>" >> _site/index.html
    elif [ "$line" == "[/TEMPLATES]" ]; then
        templateflag=0
    elif [ $templateflag == 1 ]; then
        if [ "$line" != "" ]; then
            echo "    Including template $line"
            cat templates/$line.html >> _site/index.html
        fi
    elif [ "$line" == "[TEMPLATES]" ]; then
        templateflag=1
    else
        echo "$line" >> _site/index.html
    fi
done < "$INDEX"

echo "Minifying JS..."
uglifyjs _site/js.big.js > _site/js.js
#rm _site/js.big.js
mv _site/js.big.js _site/js.js

echo "Compiling LESS..."
lessc _site/less.less > _site/css.css
rm _site/less.less
