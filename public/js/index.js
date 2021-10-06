window.onload = function () {
    const application = new Vue({
        el: '#app',

        data: {
            table: { headers: [], rows: [] }
        },

        mounted () {
            this.load()
        },

        methods: {
            async load() {
                const { data } = await axios.get('/api/git');

                console.log(data)
                this.table = data;
            },

            GetColumn(value) {
                return Object.keys(value)
            }
        },
        
        computed: {}
    })


}