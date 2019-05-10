<template>
  <section class="mb65">
    <v-toolbar extended color="primary" extension-height='40'>
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
      <v-toolbar-items slot="extension" style='width:100%; margin-left: 0px;'>
        <div style="width:100%;background-color: #fff;height:32px;line-height:32px;padding-left:5px;" class="box_shadow" color='primary'>
          <div v-if="!loading">
            <MatchBar :match="getMatch"></MatchBar>
          </div>
        </div>
      </v-toolbar-items>
    </v-toolbar>

    <div class="white py-4" v-if="!loading">
      <v-form
        ref="form"
        v-model="valid"
        method="post"
        >
        <v-text-field
          class="pa-2"
          label="Give your contest a name"
          hide-details
          v-model="name"
          outline
          placeholder="(Optional)"
          type="text"
        ></v-text-field>
        <v-text-field
          class="pa-2"
          label="Contest size"
          v-model="size"
          :rules="sizeRules"
          mask=###
          outline
          placeholder="min 2 and max 500"
          type="text"
        ></v-text-field>
        <v-checkbox class="pl-3" v-model="multiple" label="Allow friends to join multiple teams"></v-checkbox>
      </v-form>
    </div>
    <template>
      <div class="footer text-xs-center" style="max-width: 550px;">
        <div class="primary">
          <v-btn style='padding: 0px 32px;' class="white" :loading="formLoading" @click="handleSubmit()">Join and Create contest</v-btn>
        </div>
      </div>
    </template>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: 'CREATE CONTESTS',
        loading: true,
        valid: false,
        name: "",
        size: '',
        sizeRules: [
          (v) => !!v || 'contest size is required',
          (v) => (v && (v > 1 && v <= 500)) || 'Contest size should be between 2 and 500'
        ],
        formLoading: false,
        multiple: false
      }
    },
    components: {
      Back: () => import('~/components/Back'),
      MatchBar: () => import('~/components/MatchBar'),
    },
    computed: {
      getMatch() {
        return this.$store.getters['Matches/match'](this.$route.params.id);
      }
    },
    mounted: function() {
      this.getApiMatch();
    },
    methods: {
      async getApiMatch(){
        if (this.$store.getters['Matches/match'](this.$route.params.id) == undefined){
          await this.$store.dispatch('Matches/GET_MATCH', this.$route.params.id);  
        }
        this.loading = false
      },
      async handleSubmit() {
        if (this.$refs.form.validate()) {
          const formData = new FormData();
          formData.append('name', this.name);
          formData.append('members_limit', this.size);
          formData.append('multiple_entries', this.multiple);
          
          await this.$store
            .dispatch('PaidLeagues/CREATE_CONTEST', {id: this.$route.params.id, formData: formData})
            .then((res) => {
              this.showSnackBar = true;
              this.$nuxt.$emit('snackbarError', {
                snackbar: this.showSnackBar,
                message: res.message,
                button: false
              });
              this.$router.push(`/matches/${this.$route.params.id}/my-joined-leagues`);
            })
            .catch((error) => {
              this.showSnackBar = true;
              this.formLoading = false;
              this.$nuxt.$emit('snackbarError', {
                snackbar: this.showSnackBar,
                message: error.data.error,
                button: false
              });
            });
        }
      }
    }
  }
</script>

<style scoped>
  .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
  }
</style>