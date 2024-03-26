import http from "./service";
import { User } from "../interface/interface";

class URLS {
  getCsrfToken() {
    return http.get("/csrf");
  }

  Register(user: User) {
    return http.post("/register", user);
  }

  login(user: User) {
    return http.post("/login", user);
  }
  doLogout() {
    return http.post("/logout");
  }

  getOneUser(id: any) {
    return http.get(`/getOneUser/${id}`);
  }
  
  getUser() {
    return http.get("getUser");
  }

  getAll() {
    return http.get("movies");
  }
  getById(id: any) {
    return http.get(`get/${id}`);
  }

  addReview(id: any, review: any) {
    return http.post(`/post/${id}`, review);
  }

  getReviews() {
    // noStore();
    return http.get(`/reviews`);
  }
  watch_list(id: any){
    return http.post(`${id}/watch_list`);
  }
  userWatch(){
    return http.get(`watch_list`)
  }
  rating_film(id: any){
    return http.get(`/rating_film/${id}`);
  }

  created_rate(id: any, rating: any){
    return http.post(`/created_rate/${id}`, rating);
  }
}
export default new URLS();
