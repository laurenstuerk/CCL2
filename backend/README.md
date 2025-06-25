backend/
├── src/
│   ├── config/
│   │   ├── db.js                 # DB connection setup (Sequelize/MySQL)
│   │   └── socket.js             # Socket.IO initialization and config
│   │   └── env.js                # Load environment variables
│
│   ├── controllers/             # Handles logic for routes
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   └── game.controller.js
│
│   ├── models/                  # Sequelize models (or Knex schema)
│   │   ├── index.js             # Sequelize init + associations
│   │   ├── user.model.js
│   │   ├── game.model.js
│   │   └── score.model.js
│
│   ├── routes/                  # Defines route paths
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   └── game.routes.js
│
│   ├── middlewares/
│   │   ├── auth.middleware.js   # JWT auth checker
│   │   └── error.middleware.js
│
│   ├── socket/                  # Real-time logic for multiplayer
│   │   ├── index.js             # Registers namespaces/handlers
│   │   └── lobby.handler.js     # Lobby-specific events
│
│   ├── utils/
│   │   ├── jwt.js               # sign/verify helpers
│   │   └── hash.js              # bcrypt helpers
│
│   ├── app.js                   # Express app setup (routes, middleware)
│   └── server.js                # Entry point (starts HTTP + Socket.IO)
│
├── .env                         # Env vars (DB, JWT, etc.)
├── package.json
└── README.md
