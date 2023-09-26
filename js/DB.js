export default class DB {
  static setApiURL(data) {
    this.apiURL = data;
  }
/* trier la liste par date  */
  static async findAll() {
    const reponse = await fetch(this.apiURL + "/todos");
    return await reponse.json();
  }

  static async addOne(data) {
    const response = await fetch(this.apiURL + "/todos", {
      method: "post",
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify(data),
    });
    return await reponse.json();
  }
}
