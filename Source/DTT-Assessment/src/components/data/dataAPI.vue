<script>
export default {
    data() {
        return {
            houses: [],
            house: []
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
        async getOneHouse(id) {
            try {
                const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
                    method: 'GET',
                    headers: {
                        'X-Api-Key': '5gYzjH2QcGXEqSZv_Fk6pmW8-3hfJTDo',
                    },
                });
                const dataDone = await response.json();
                this.house = dataDone;
                return this.house;
            }
            catch (error) {
                console.error('Error fetching house data:', error);
            }
        },
        async deleteHouse(id) {
            try {
                const response = await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'X-Api-Key': '5gYzjH2QcGXEqSZv_Fk6pmW8-3hfJTDo',
                    },
                });
                const dataDone = await response.json();
                return dataDone;;
            }
            catch (error) {
                console.error('Error fetching house data:', error);
            }
        }
    },
    beforeMount() {
        this.getData();
    }
}
</script>