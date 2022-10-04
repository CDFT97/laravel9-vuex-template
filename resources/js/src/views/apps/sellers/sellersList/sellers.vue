<template>
    <div>
      <b-table
        id="UserTable"
        class="position-relative" 
        striped hover
        responsive
        show-empty
        empty-text="No matching records found"
        :fields="fields"
        :items="sellers"
        :per-page="perPage"
        :current-page="currentPage">
  
        <template #cell(Action)="data" v-if="loaderRol">
          <b-button 
            variant="warning"
            v-on:click.prevent="editUser(data.item.id)">
            <span class="text-nowrap">Show details</span>
          </b-button>
  
          <!-- <b-button 
            variant="danger"
            v-on:click.prevent="deleteUser(data.item.id)">
            <span class="text-nowrap">Delete</span>
          </b-button> -->
        </template>
  
      </b-table>
      <b-pagination
        v-model="currentPage"
        :per-page="perPage"
        :total-rows="rows"
        aria-controls="UserTable"
      ></b-pagination>
    </div>
  </template>
  
  <script>
    import {
      // BCard,
      // BRow,
      // BCol,
      // BFormInput,
      BButton,
      BTable,
      // BMedia,
      // BAvatar,
      // BLink,
      // BBadge,
      // BDropdown,
      // BDropdownItem,
      BPagination,
    } from 'bootstrap-vue'
  
    export default {
      components: {
        // BCard,
        // BRow,
        // BCol,
        // BFormInput,
        BButton,
        BTable,
        // BMedia,
        // BAvatar,
        // BLink,
        // BBadge,
        // BDropdown,
        // BDropdownItem,
        BPagination,
      }, 
  
      data() {
        return {
          loaderRol: null,
          token: sessionStorage.getItem('jwt'),
          rol: sessionStorage.getItem('rol'),
          perPage: 5,
          currentPage: 1,
          sellers: [],
          fields: [
            {
              key: 'id',
              sortable: true
            },
            {
              key: 'name',
              sortable: true
            },
            {
              key: 'last_name',
              sortable: true
            },
            {
              key: 'lots_sold',
              sortable: true
            },
            {
              key: 'total_amount',
              label: 'total amount',
              sortable: true
            },
            {
              key: 'Clients_amount_indebted',
              label: 'clients amount indebted',
              sortable: true
            },
            {
              key: 'Action',
            },
          ]
        }
      },
  
      computed: {
        rows() {
          return this.users.length
        }
      },
  
      created() {
        this.getSellers()
        this.userRol()
      },
  
      methods: {
        userRol(){
          this.rol == 1 || this.rol == 4
            ? this.loaderRol = true
            : this.loaderRol = false
        },
  
        getSellers() {
          this.$http.get('api/sellers', {
            headers: {'Authorization' : `Bearer ${this.token}`}
          })
            .then((res) => {
              this.users = res.data
            }).catch((error) => {       
              console.log(error);
          })
        },
  
        editUser(id) {
          sessionStorage.setItem('user', id)
          this.$router.push('/apps/users/edit')
        },
  
        create() {
          this.$router.push('/apps/users/create')
        }
  
        // deleteUser(id) {
        //   console.log(id)
        // },
      }
    }
  </script>
  |
  <style>
    
  </style>