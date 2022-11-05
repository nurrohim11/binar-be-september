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

  npx sequelize-cli model:generate --name article --attributes title:string,body:string,approved:boolean  
  sequelize db:migrate