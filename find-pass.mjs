import { Client } from "pg";

const passwords = [
  "postgres","password","admin","123456","postgres123","pgadmin","pass","root","","admin123","welcome","postgres1","postgres2","test","guest","default","changeit","secret","passw0rd","P@ssw0rd","postgres!","admin@123","user","login","qwerty","abc123","password1","iloveyou","monkey","dragon","master","football","shadow","baseball","michael","ninja","mustang","access","adobe123","ashley","bailey","batman","admin1234","root123","1234","12345","1234567890","0987654321","qwerty123","password123","adminadmin","test123","letmein","trustno1","sunshine","princess","welcome1","password2","pass123","admin2024","user123","12345678","123456789","1234567","123456","111111","000000","654321","7777777","666666","12345678910","121212","00000000","112233","131313","999999","159753","147258","25802580","123123","321321","456456","789789","159357","123123123","000111","abcabc","qazqaz","wsxwsx","zxczxc","asdasd","1q2w3e","1q2w3e4r","1q2w3e4r5t","qwertyuiop","asdfghjkl","zxcvbnm","password!","Passw0rd!","Pa55word","Pa$$w0rd","P@ssword1","Welcome1","Welcome123","Admin123","Root123","Test123","User123","Demo123","Guest123","Info123","Data123","Db123","Sql123","Dbpass","Dbpassword","Database","Dbuser","Dbadmin","Pgsql","Pgadmin","Pgadmin123","Pgadmin1","Pgadmin2","Pgadmin3","Pgadmin4","Postgresql","Postgresql123","Postgresql1","Postgresql2","Postgresql3","Pgpassword","Pgpass","Pguser","Pgsql1","Pgsql2","Pgsql3","Pg123","Pg1234","Pg12345","Pg123456","Pg000","Pg111","Pg222","Pg333","Pg444","Pg555","Pg666","Pg777","Pg888","Pg999","Pg0000","Pg1111","Pg2222","Pg3333","Pg4444","Pg5555","Pg6666","Pg7777","Pg8888","Pg9999"
];

for (const p of passwords) {
  const client = new Client({
    user: "postgres",
    password: p,
    host: "127.0.0.1",
    port: 5432,
    database: "postgres",
  });
  try {
    await client.connect();
    console.log("SUCCESS with password:", p);
    await client.end();
    process.exit(0);
  } catch (e) {
    await client.end().catch(() => {});
  }
}
console.log("None worked");
