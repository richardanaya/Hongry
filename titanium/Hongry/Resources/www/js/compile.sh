#! /bin/bash
closure-library/closure/bin/calcdeps.py -i hongry_app.js  -p closure-library/ -o compiled -c compiler.jar -f "--compilation_level=ADVANCED_OPTIMIZATIONS" > hongry_app_compiled.js
