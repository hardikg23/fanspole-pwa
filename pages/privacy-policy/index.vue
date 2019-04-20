<template>
  <section>
    <v-toolbar color="primary">
      <Back :showhome="true" />
      <span class="white--text fontw600">{{title}}</span>
    </v-toolbar>

    <v-card md5 class='pa-0'>
      <v-layout row wrap>
        <v-flex xs12 class='pa-4'>
          <div>
            <div>
              &nbsp;&nbsp;&nbsp;This privacy policy sets out how Fanspole.com uses and protects any information that you give when you use this website.
            </div>
            <br>
            <div>
              &nbsp;&nbsp;&nbsp;Fanspole.com is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.
            </div>
            <br>
            <div>
              &nbsp;&nbsp;&nbsp;Fanspole.com may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from 22nd March 2015.
            </div>
            <br>
            <div>
              <b>What we collect</b><br>
              We may collect the following information: 
              <ul>
                <li>Name, Email Adderess</li>
                <li>Phone numbers are collected as part of redemtion request to process recharges.</li>
                <li>Demographic information such as postcode, preferences and interests</li>
                <li>Other information relevant to customer surveys and/or offers</li>
              </ul>
            </div>
            <br>
            <div>
              <b>What we do with the information we gather</b><br>
              &nbsp;&nbsp;&nbsp;We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
              <ul>
                <li>Internal record keeping. </li>
                <li>We may use the information to improve our products and services.</li>
                <li>We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.  </li>
                <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customise the website according to your interests.</li>
              </ul>
            </div>
            <br>
            <div>
              <b>Security</b> <br>
               &nbsp;&nbsp;&nbsp;We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure. 
            </div>
            <br>
            <div>
              <b>How we use cookies </b> <br>
              &nbsp;&nbsp;&nbsp;A cookie is a small file which asks permission to be placed on your computer's hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences. 
              
              We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system. 
              
              Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us. 
              
              You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website. 
            </div>
            <br>
            <div>
              <b>Links to other websites</b> <br>
              &nbsp;&nbsp;&nbsp;Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.

              If you believe that any information we are holding on you is incorrect or incomplete, please write to or email us as soon as possible, at the admin@fanspole.com. We will promptly correct any information found to be incorrect.
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-card>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        title: "PRIVACY POLICY",
      }
    },
    components: {
      Back: () => import('~/components/Back'),
    },
  }
</script>
