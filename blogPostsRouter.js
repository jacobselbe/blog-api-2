const express = require('express');
const router = express.Router();

const jsonParser = require('body-parser').json();

const {BlogPosts} = require('./models');

const loremContent = [
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus, dolorem. Cumque quaerat saepe fuga atque ad error. Recusandae perspiciatis doloremque accusantium. Inventore sint quasi nam quos tempore voluptates explicabo delectus repudiandae, magni quaerat mollitia, molestias in quas deleniti rerum suscipit, dignissimos qui architecto consectetur recusandae maxime sunt ipsum exercitationem. Illum inventore neque suscipit provident nesciunt doloribus, sint facere reiciendis repudiandae iusto exercitationem, porro eos adipisci saepe delectus alias. Est commodi laboriosam eos. Dolor amet error fuga mollitia quos aspernatur et.',

    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro sunt assumenda quos qui! Est consequatur, quisquam soluta dolores voluptatem omnis eos corrupti nisi suscipit, perspiciatis tempore non consectetur dicta provident ducimus fugit sunt nemo recusandae ut animi. Pariatur expedita officiis architecto, sunt porro consectetur repudiandae sed eius accusantium voluptas nam ipsum at neque doloribus, dolor ab quod nisi. Tempore explicabo, ducimus nihil repudiandae nobis nulla eaque eligendi consequatur ab officiis, temporibus, quod facere sequi fugit animi ex. Voluptatum, molestias. Blanditiis eaque error beatae quod natus recusandae sint labore deserunt voluptate, incidunt quo earum voluptatum laudantium quae, voluptates eius. In magni similique non et corrupti mollitia iure. Amet ex, nesciunt reprehenderit sint harum maiores eligendi, magni, ratione libero quo repellendus nam.',

    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae, pariatur cumque ipsum eos impedit corrupti ab. Dolorem impedit, corrupti, ipsum excepturi ipsa quisquam eligendi fugiat rerum explicabo, incidunt maxime veniam possimus. Nostrum expedita, explicabo asperiores facere odio suscipit accusantium, minima fugiat porro dolor maiores dolorum. Adipisci repellat amet dignissimos necessitatibus quam. Delectus fugit cumque suscipit ipsa officia voluptas assumenda deleniti qui labore unde repellat autem, et sequi! Architecto laborum rem, deleniti impedit excepturi eius nesciunt non hic necessitatibus, tempora nisi autem quas assumenda quam voluptatibus debitis temporibus. Sed reiciendis consequuntur recusandae in asperiores et quia soluta laudantium dolores! Obcaecati ullam quae soluta doloremque? Nesciunt ea quos magnam ex, voluptatem optio recusandae quidem quod excepturi, est dolorem voluptatibus dolore quibusdam reiciendis similique atque sed quis perferendis tempore amet exercitationem. Quibusdam molestias et dolorum iure eius ad, totam eos reiciendis quasi quisquam dignissimos doloribus esse nulla? Sapiente hic eaque quisquam minima adipisci?'
];

BlogPosts.create('Morning Run', loremContent[0], 'Jacob Selbe');
BlogPosts.create('Evening Run', loremContent[1], 'Frank Furt');
BlogPosts.create('Weekend Run', loremContent[2], 'Joe Johnson');

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

// router.post();

// router.put();

// router.delete();

module.exports = router;