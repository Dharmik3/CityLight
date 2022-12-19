export const loadScript = (src) => {
    return new Promise((resolve) => {
        console.log('from loadscript');
 
        const script = document.createElement('script');
        script.src = src;
        script.addEventListener('load', () => {
            resolve(true);
        })
        script.addEventListener('error', () => {
            resolve(false);
        })

        // script.onload(() => {
        //     resolve(true);
        // })
        // script.onerror(() => {
        //     resolve(false);
        // })
        document.body.appendChild(script);
    })
}