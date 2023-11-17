<script>
export default {
    data() {
        return {
            houses: [],
        };
    },

    methods: {
        async getData() {
            try {
                const response = await fetch('https://api.intern.d-tt.nl/api/houses', {
                    method: 'GET',
                    headers: {
                        'X-Api-Key': '5gYzjH2QcGXEqSZv_Fk6pmW8-3hfJTDo',
                    },
                });

                const dataDone = await response.json();
                this.houses = dataDone;
                return this.houses;
            }
            catch (error) {
                console.error('Error fetching house data:', error);
            }
        },
    },
    beforeMount() {
        this.getData();
    }
}
</script>