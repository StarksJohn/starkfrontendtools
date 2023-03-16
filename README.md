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


Push and Publish:

        1 update the version in package.json
        2 nvm use 14 && npm version patch && git commit -a -s -m 'add' && git push origin master && npm login && npm publish
            Username: stark2018  Zcxxxxxx  397866153@qq.com   
        3 Finally, in your main project, yarn add starkfrontendtools or npm i starkfrontendtools


        
