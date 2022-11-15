- pegawai
  - nama, jenis_kelamin, tgl_masuk:date, email

<!-- running model -->
// npx sequelize-cli model:generate --name pegawai --attributes nama:string,jenis_kelamin:string,tgl_masuk:date,email:string  

npx sequelize-cli model:generate --name pegawai --attributes nama:string,jenis_kelamin:string,tgl_masuk:date,email:string


npx sequelize-cli model:generate --name pegawai --attributes nama:string,jenis_kelamin:string,tgl_masuk:date,email:string
<!-- running miggrate -->
sequelize db:migrate


- article
  - title, body, approved

  npx sequelize-cli model:generate --name item --attributes name:string,price:integer,qty:integer
  npx sequelize-cli db:migrate


- crud product
  name, qty, price, image, category, description

- create API documentation
- setiap endpoint harus ada validasi untuk mengecek string kosong apa enggak. 
- setiap documentasi harus ada contoh response baik itu response 500, 400, 200, 404
