import axios from "axios";

export default {
  isLoggedIn: function() {
    return axios.get("/login/check");
  },

  localLogIn: function(username, password) {
    return axios.post("/login/local", {
      username: username,
      password: password
    });
  },

  logOut: function() {
    return axios.get("/logout");
  },

  // Remove Friend
  removeFriend: function(id) {
    return axios.delete("api/friend/" + id);
  },

  facebookLogIn: function() {
    return axios.get("/login/facebook");
  },

  getUserMedia: function() {
    return axios.get("api/user/find");
  },

  getUserFeed: function() {
    return axios.get("api/user/feed/");
  },

  getFeedItems: function() {
    return axios.get("api/user/getFeedItems/");
  }
};
