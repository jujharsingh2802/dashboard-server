class Product {
  constructor(id, category, city, createdAt, desc, image, title, userEmail, userImage, userName) {
      (this.id = id),
        (this.category = category),
        (this.city = city),
        (this.createdAt = createdAt),
        (this.desc = desc),
        (this.image = image),
        (this.title = title),
        (this.userEmail = userEmail),
        (this.userImage = userImage),
        (this.userName = userName);
  }
}

export default Product;