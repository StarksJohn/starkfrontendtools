// @ts-ignore
import React, {
    useEffect,
    useState,
    // @ts-ignore
} from 'react';

//Force refresh of the current comp
export default () => {
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        console.log('useRefreshComp.ts useEffect refresh=', refresh)
        refresh && setTimeout(() => setRefresh(false))
    }, [refresh])

    const doRefresh = () => {
        console.log('useRefreshComp.ts doRefresh')
        setRefresh(true)
    }

    return {doRefresh};
};
