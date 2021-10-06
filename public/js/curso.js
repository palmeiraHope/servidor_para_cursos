window.onload = function () {
    const application = new Vue({
        el: '#app',
    
        data: {
            values: [],
            source: ""
        },
    
        mounted () {
            this.get()
        },
    
        methods: {
            async get () {
                const { data } = await axios.get('/api/routes/')
    
                this.values = data.sort((last, next) => {
                    let [numeric1, name1, ext1] = last.split('_')
                    let [numeric2, name2, ext2] = next.split('_')

                    if (parseInt(numeric1) > parseInt(numeric2)) return 1;
                    else return -1
                }).map((path) => {
                    console.log(path)
                    return {
                        path,
                        on: false,
                        data: []
                    }
                });
            },
    
            async routerclick(event, route, index) {
                if (route.on) {
                    route.on = false;
                    this.source = null;
                    return;
                }
    
                const { data } = await axios.get(`/api/routes/${route.path}`);
                this.values[index].data = data;
                route.on = true;
            },
    
            async videoclick(event, { path }, data) {
                this.source = null;
    
                setTimeout(() => {
                    this.source = `/video/${path}/${data}`
                    if (videoElement)
                        videoElement.play()
                }, 1500)
            }
        }
    })
}