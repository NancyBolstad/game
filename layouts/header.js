// FILE: header.js
import { userProfile } from '../components/user-profile';

class Header {


  loadHeader() {

    // Invoke the method
    userProfile.loadUserProfile();

    console.log('Header component is loaded...')

  }

}

export let header = new Header(); 