<template>
<v-app>
    <v-data-table :headers="headers"
      :items="klienci"
      class="elevation-1">
            <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-right">{{ props.item.imie }}</td>
        <td class="text-xs-right">{{ props.item.nazwisko }}</td>
        <td class="text-xs-right">{{ props.item.adres }}</td>
        <td class="text-xs-right">{{ props.item.numertelefonu }}</td>
        <td class="text-xs-right"><button @click="usunKlienta(props.item.id, props.index)" class="btn btn-danger">Usuń</button></td>
      </template>
    </v-data-table>
    <div class="container">
    <form>
        <div class="form group">
            <label for="imie">Imię</label>
            <input v-model="nowyklient.imie" class="form-control" id="imie" placeholder="Jan">
        </div>
        <div class="form group">
            <label for="nazwisko">Nazwisko</label>
            <input v-model="nowyklient.nazwisko" class="form-control" id="nazwisko" placeholder="Kowalski">
        </div>
        <div class="form group">
            <label for="adres">Adres</label>
            <input v-model="nowyklient.adres" class="form-control" id="adres" placeholder="jan@kowalski.pl">
        </div>
        <div class="form group">
            <label for="numertelefonu">Numer telefonu</label>
            <input v-model="nowyklient.numertelefonu" class="form-control" id="numertelefonu" placeholder="+48 123 456 789">
        </div>
        <button @click.prevent="dodajKlienta" type="submit" class="btn btn-primary">Dodaj</button>
    </form>
    </div>
</v-app>
</template>
<script>
import axios from 'axios';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

export default{
    name: 'ListKlienci',
    components: {},
    data() {
        return {
            headers: [
            {
            text: 'Id klienta',
            align: 'left',
            value: 'id'
            },
            { text: 'Imie', value: 'imie' },
            { text: 'Nazwisko', value: 'nazwisko' },
            { text: 'Adres', value: 'adres' },
            { text: 'Numer Telefonu', value: 'numertelefonu' },
            { text: 'Usuń', value: 'usun' }
      ],
            klienci: [],
            
            message: '',

            nowyklient: {
                imie: '',
                nazwisko: '',
                adres: '',
                numertelefonu: ''
            }
        }
    },
    created: function() {
        this.fetchKlienci();
    },
    methods: {
        fetchKlienci: function(){
            var url = 'http://127.0.0.1:8080/client/get';
            this.$http.get(url)
            .then((result) => {
            this.klienci = result.data
        });
        },

        dodajKlienta: function() {
            axios.post('http://127.0.0.1:8080/client/add', {
                imie: this.nowyklient.imie,
                nazwisko: this.nowyklient.nazwisko,
                adres: this.nowyklient.adres,
                numertelefonu: this.nowyklient.numertelefonu
            });
            this.klienci = [];
            this.fetchKlienci();
        },

        usunKlienta: function(id, index) {
        axios.delete('http://127.0.0.1:8080/client/delete/' + id)
        this.klienci.splice(index, 1)
        },
    },
    

}
</script>