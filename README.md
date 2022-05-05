# starkfrontendtools
Contains react and vue tool modules commonly used in the front end

    This project is based on https://github.com/jaredpalmer/tsdx (https://www.modb.pro/db/46048)

HomePage:

        https://github.com/StarksJohn/starkfrontendtools

Install:

        yarn add starkfrontendtools

Usage:

        import {  } from 'starkfrontendtools';

        Better way to use: 
            https://zh-hans.reactjs.org/docs/code-splitting.html
            https://github.com/StarksJohn/StarkReactProjectScaffold
            eg:
                import("starkfrontendtools").then(starkfrontendtools => {
                     const randomNum= starkfrontendtools.Math.randomNums(0,10)
                      console.log('testDynamicImports randomNum=',randomNum)
                });

Publish:

        npm login
        npm publish 
            note: change the version of your package.json every time before npm publish

Push:

        git commit -a -s -m ''
        git push origin master


        
