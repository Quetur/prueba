const express = require('express');
const router = express.Router();

const pool = require('../database');

const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');

// SIGNUP
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
}));

// ingreso
router.get('/signin', (req, res) => {
  res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
  req.check('username', 'Username is Required').notEmpty();
  req.check('password', 'Password is Required').notEmpty();
  const errors = req.validationErrors();
  if (errors.length > 0) {
    req.flash('message', errors[0].msg);
    res.redirect('/signin');
  }
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});


// listado de productos
router.get('/producto', async(req, res) => {
   console.log('authentication nuevo ingreso');
  const data = await pool.query('SELECT * FROM PRODUCTO');  
  //console.dir(data);
  // va a producto.js
  res.render('producto', {data });
 /* if (err) {
    res.json(err);
  }
  */
  // console.log(producto_view);
  //res.render('producto_view', {
     // data:producto_view
 // })
});




router.get('/pedidos', async(req, res) => {
  console.log('autentication /pedidos');
  //le mando id_users de req
  const id_users = req.user.id_users;  
  console.dir(req.user.id_users);
  console.log(id_users);
  const ped = await pool.query('SELECT * FROM pedido WHERE id_users = ?', id_users);  
 console.log('despues del listado')
 console.log(ped);
 res.render('pedidos', {ped});
 //res.redirect('/pedidos/list');
});

//    listado decarrito de compras
router.get('/carrito', async(req, res) => {
  console.log('listado de carrito');
  //console.log(id_users);
 //const ped = await pool.query('SELECT * FROM pedido WHERE user_id = ?', [req.user.id]);  
 //console.dir(ped);
 res.render('pedido', {ped });
 if (err) {
   res.json(err);
 }
 // console.log(producto_view);
 res.render('producto_view', {
    // data:producto_view
 })
});



router.get('/verProducto/:id', async(req, res) => {
  console.log('verProducto');
 
  const id_users = req.user.id_users;  


  const pro = await pool.query('SELECT * FROM producto WHERE id_producto = ?', [req.params.id]); 
 
  console.log(pro)
  res.render('verProducto', {pro});   // pasar pro a carritoadd
});


router.get('/agregaCarrito/:id', async(req, res) => {
  console.log('agrega carrito');
 
  const id_users = req.user.id_users;  


  const pro = await pool.query('SELECT * FROM producto WHERE id_producto = ?', [req.params.id]); 
 
  console.log(pro)
  res.render('carritoAdd', {pro});   // pasar pro a carritoadd
  

  /*
  var sql = 'INSERT into carrito (id_users,id_producto,cant) VALUES (12,1,500)';
  pool.query(pro, function (err, result) { 
    if (err) throw err;
  //  console.log("agrego 1 registro");
  }); 
  var sql = "INSERT Into pedido (id_pedido,nro_pedido,id_users,fecha,total,entregado) VALUES (NULL,'','12','12/12/2020','100','20/12/2020')";
  pool.query(sql, function (err, result) { 
  if (err) throw err;
    console.log("agrego 1 registro pedido");
  }); 
 /* var sql = "INSERT Into detallepedido (id,nro_pedido,user,fecha,total) VALUES (NULL,'0001','12','12/12/2020',105)";
  pool.query(sql, function (err, result) { 
    if (err) throw err;
    console.log("agrego 1 registro");
  }); 
*/
});


module.exports = router;

