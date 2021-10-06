const controllers = {
    fullsSreenOn: false,
    click: {
        count: 0,
        lastModify: null
    }
}

async function clickEmMim(event = new MouseEvent()) {
    if (controllers.click.lastModify == null) {
        controllers.click.count++;
        controllers.click.lastModify = new Date()
        return;
    }

    const date = new Date()
    if (
        date.getHours() == controllers.click.lastModify.getHours() &&
        date.getMinutes() == controllers.click.lastModify.getMinutes() &&
        date.getSeconds() == controllers.click.lastModify.getSeconds()
    ) {
        try {
            if (!controllers.fullsSreenOn) {
                controllers.fullsSreenOn = true;
                await window.document.body.requestFullscreen({
                    navigationUI: 'show'                      
                })
            }
            else {
                controllers.fullsSreenOn = false;
                await window.document.exitFullscreen()
            }


        } catch (error) {
            console.error(error);
        }
    }

    controllers.click.count = 0;
    controllers.click.lastModify = null;
}