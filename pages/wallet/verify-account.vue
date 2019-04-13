<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>
    
    <v-dialog v-model="loading">
      <v-layout class="white">
        <v-flex xs12 class="text-xs-center pa-4">
          <v-progress-circular
            indeterminate
            :width="3"
            color="primary"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-dialog>

    <div v-if="!loading">
      <v-tabs grow centered slider-color=primary>
        <v-tab ripple :key="1" class="primary--text font-weight-bold">
          <div>Mobile & Email</div>
        </v-tab>
        <v-tab ripple :key="2" class="primary--text font-weight-bold">
          <div>PAN</div>
        </v-tab>
        <v-tab-item :key="1">
          <div v-if="!getMobileApproved">
            <div v-if="!otpSent">
              <v-card class="ma-2">
                <v-layout row wrap class="white pa-2">
                  <v-flex xs1>
                    <v-icon>mobile_friendly</v-icon>
                  </v-flex>
                  <v-flex xs11>
                    Verify your mobile
                  </v-flex>
                  <v-flex xs12 class="pa-2">
                    <v-form lazy-validation ref="">
                      <v-text-field
                          solo
                          v-model="mobile_number"
                          hide-details
                          mask=##########
                          name="mobile_number"
                          label="Your 10 digit mobile no."
                          type="text"
                          required
                        />
                    </v-form>
                  </v-flex>
                  <v-flex xs12 class="grey--text pl-2">
                    you will receive an OTP on this mobile no
                  </v-flex>
                  <v-flex xs12 class="pa-0 mt-2">
                    <v-btn @click="otpClick()" large class="pa-0 ma-0  primary font-weight-bold" style="width:100%">SEND OTP</v-btn>
                 </v-flex>
                </v-layout>
              </v-card>
            </div>
            <div v-else>
              <v-card class="ma-2">
                <v-layout row wrap class="white pa-2">
                  <v-flex xs1>
                    <v-icon>mobile_friendly</v-icon>
                  </v-flex>
                  <v-flex xs11>
                    Otp has been sent to {{mobile_number}}
                  </v-flex>
                  <v-flex xs12 class="pa-2">
                    <v-form lazy-validation ref="">
                      <v-text-field
                          solo
                          v-model="otp"
                          hide-details
                          mask=######
                          name="otp"
                          label="Enter 6 digit OTP"
                          type="text"
                          required
                        />
                    </v-form>
                  </v-flex>
                  <v-flex xs12 class="pa-0 mt-2">
                    <v-btn @click="otpVerifyClick()" large class="pa-0 ma-0  primary font-weight-bold" style="width:100%">VERIFY MOBILE</v-btn>
                 </v-flex>
                </v-layout>
              </v-card>
            </div>
          </div>
          <div v-else>
            <v-card class="ma-2" style="border: 2px solid #00C853">
              <v-layout row wrap class="white pa-2">
                <v-flex xs1>
                  <v-icon class="green--text text--accent-4">mobile_friendly</v-icon>
                </v-flex>
                <v-flex xs11>
                  Your Mobile No is verified
                </v-flex>
                <v-flex xs1>
                </v-flex>
                <v-flex xs11 class="green--text text--accent-4 font-weight-bold font11">
                  {{getMobileNo}}
                </v-flex>
              </v-layout>
            </v-card>
          </div>

          <v-card class="ma-2" style="border: 2px solid #00C853">
            <v-layout row wrap class="white pa-2">
              <v-flex xs1>
                <v-icon class="green--text text--accent-4">email</v-icon>
              </v-flex>
              <v-flex xs11>
                Your email address is verified
              </v-flex>
              <v-flex xs1>
              </v-flex>
              <v-flex xs11 class="green--text green--text text--accent-4 font-weight-bold font11">
                {{getEmail}}
              </v-flex>
            </v-layout>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="2">
        </v-tab-item>
      </v-tabs>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "VERIFY YOUR ACCOUNT",
        mobile_number: '',
        otp: '',
        otpSent: false,
        loading: true
      }
    },
    components: {
      Back: () => import('~/components/Back')
    },
    computed: {
      getEmail(){
        return this.$store.getters['Me/email'];
      },
      getMobileNo(){
        return this.$store.getters['Me/mobile_no'];
      },
      getMobileApproved(){
        return this.$store.getters['Me/mobile_approved'];
      }
    },
    created: function() {
      this.getApiAccountDetails();
    },
    methods: {
      async getApiAccountDetails(){
        await this.$store.dispatch('Me/GET_APPROVED_DETAILS');
        this.loading = false
      },
      async otpClick(){
        this.loading = true
        if(this.mobile_number.length == 10){
          await this.$store
            .dispatch('MobileNumber/SEND_OPT', {mobile_number: this.mobile_number})
            .then((res) => {
              this.otpSent = true;
              this.$nuxt.$emit('snackbarError', {
                snackbar: true,
                message: res.message,
                button: false
              });
            })
            .catch((error) => {
              this.$nuxt.$emit('snackbarError', {
                snackbar: true,
                message: error.data.error,
                button: false
              });
            });
            this.loading = false;
        }else{
          this.$nuxt.$emit('snackbarError', {
            snackbar: true,
            message: "Enter valid mobile no.",
            button: false
          });
        }
        this.loading = false
      },
      async otpVerifyClick(){
        this.loading = true
        if(this.otp.length == 6){
          await this.$store
            .dispatch('MobileNumber/VERIFY_OPT', {mobile_number: this.mobile_number, otp: this.otp})
            .catch((error) => {
              this.$nuxt.$emit('snackbarError', {
                snackbar: true,
                message: error.data.error,
                button: false
              });
            });
            this.loading = false;
        }else{
          this.$nuxt.$emit('snackbarError', {
            snackbar: true,
            message: "Invalid OTP",
            button: false
          });
        }
        this.loading = false
      }
    }
  }
</script>
