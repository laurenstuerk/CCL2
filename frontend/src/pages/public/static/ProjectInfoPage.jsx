import { Helmet } from "react-helmet-async";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Play, Wrench, Mail, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const floatAnim = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function ProjectInfoPage() {
  return (
    <>
      <Helmet>
        <title>Project Info - Ripground</title>
        <meta name="description" content="Project Info page for Ripground – learn how it works under the hood, explore its architecture, and discover the games it offers." />
      </Helmet>

      <div className="prose prose-invert prose-lg max-w-none">
        {/* Header Section */}
        <motion.header
          className="text-left pt-16 pb-12 max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl font-bold tracking-tight text-white"
            initial={{ scale: 0.9, rotate: -2 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            Ripground
          </motion.h1>
          <motion.p
            className="mt-4 text-xl text-neutral-300 mx-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Ripground is a full-stack web platform for playing and experimenting with browser-based games. Developed during <span className="font-semibold text-indigo-400">Creative Code Lab 2</span> in just two weeks, it combines a robust Node.js/Express backend with a React frontend and a mySQL database.
          </motion.p>

          <motion.p
            className="mt-4 text-xl text-neutral-300 mx-auto"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The project features three titles: a physics-based marble rush challenge, a real-time open-drive multiplayer racing experience powered by WebSockets, and a single-player shooter built for experimentation.
          </motion.p>

          <motion.p
            className="mt-4 text-xl text-neutral-300 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Beyond the games themselves, Ripground is a sandbox for testing authentication, synchronization, and modern scalable web architecture — all wrapped in an interactive experience.
          </motion.p>
        </motion.header>

        {/* Login Instructions */}
        <section className="bg-neutral-900/60 p-6 rounded-xl border border-neutral-800 mb-16" aria-labelledby="instructions-heading">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.6 }}>
            <h2 id="instructions-heading" className="text-2xl font-bold text-center text-indigo-300 mb-6">
              How to Test and Log In
            </h2>
            <p className="text-neutral-300 text-center max-w-2xl mx-auto mb-8">Ripground supports two simple authentication methods so you can quickly jump into the action without hassle:</p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div whileHover={{ scale: 1.08, rotate: -1 }} whileTap={{ scale: 0.95 }} className="flex flex-col items-center text-center bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                <motion.div variants={floatAnim} animate="animate">
                  <Mail className="h-8 w-8 text-blue-400 mb-3" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Email & Password</h3>
                <p className="text-neutral-400">Create an account with your email address and a secure password.</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.08, rotate: 1 }} whileTap={{ scale: 0.95 }} className="flex flex-col items-center text-center bg-neutral-900 p-6 rounded-lg border border-neutral-800">
                <motion.div variants={floatAnim} animate="animate">
                  <Globe className="h-8 w-8 text-red-400 mb-3" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2">Google Sign up & Login</h3>
                <p className="text-neutral-400">Use your Google account for instant sign-in — no additional setup required. This option lets you start playing right away with minimal friction.</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <Separator className="my-16 bg-neutral-800" />

        {/* Game Infos Section */}
        <motion.section className="py-12" aria-labelledby="game-infos-heading" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.6 }}>
          <div className="text-center">
            <h2 id="game-infos-heading" className="text-3xl font-bold">
              Game Infos
            </h2>
            <p className="mt-2 text-neutral-400">Learn more about the different games available on Ripground.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div whileHover={{ scale: 1.1, rotate: 1 }} whileTap={{ scale: 0.95 }} className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 text-center">
              <motion.div variants={floatAnim} animate="animate">
                <Play className="mx-auto h-10 w-10 text-yellow-400 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold">Marble Rush 3D</h3>
              <p className="mt-2 text-neutral-300">
                A <strong>React Three Fiber</strong> singleplayer marble rolling challenge. Test your precision and speed with integrated highscore tracking.
              </p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, rotate: -1 }} whileTap={{ scale: 0.95 }} className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 text-center">
              <motion.div variants={floatAnim} animate="animate">
                <Play className="mx-auto h-10 w-10 text-green-400 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold">Socket Drive</h3>
              <p className="mt-2 text-neutral-300">
                A <strong>React Three Fiber</strong> open-drive multiplayer experience. Race and explore with others in real-time using WebSockets.
              </p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1, rotate: 2 }} whileTap={{ scale: 0.95 }} className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 text-center">
              <motion.div variants={floatAnim} animate="animate">
                <Play className="mx-auto h-10 w-10 text-purple-400 mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold">Stack Mate</h3>
              <p className="mt-2 text-neutral-300">
                A simple <strong>Godot</strong> FPS prototype. Originally intended for multiplayer, this singleplayer shooter was built as a testbed for compatibility and performance.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <Separator className="my-16 bg-neutral-800" />

        {/* Under The Hood Section */}
        <motion.section className="bg-gray-800/50 p-6 rounded-xl border border-gray-700" aria-labelledby="under-the-hood-heading" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.6 }}>
          <h2 id="under-the-hood-heading" className="text-2xl font-bold flex items-center gap-3 mb-4 text-gray-100">
            <Wrench size={28} className="text-purple-400" />
            Under The Hood
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.05, x: -4 }}>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Backend Architecture</h3>
              <p className="text-gray-300">
                The server follows the <strong className="font-medium">MVC (Model-View-Controller)</strong> architecture for a clean separation of concerns.
              </p>
              <ul className="mt-3 list-disc list-inside text-gray-400 space-y-1">
                <li>
                  <strong className="text-gray-300">Models:</strong> Define data structure with Mongoose.
                </li>
                <li>
                  <strong className="text-gray-300">Controllers:</strong> Handle all business logic.
                </li>
                <li>
                  <strong className="text-gray-300">Routes:</strong> Map API endpoints to controllers.
                </li>
                <li>
                  <strong className="text-gray-300">Utils:</strong> Helpers for JWT, hashing, and Cloudinary integration.
                </li>
              </ul>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, x: 4 }}>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">Frontend Structure</h3>
              <p className="text-gray-300">
                Built with <strong className="font-medium">React</strong>, the frontend is organized into modular components, pages, and features.
              </p>
              <ul className="mt-3 list-disc list-inside text-gray-400 space-y-1">
                <li>
                  <strong className="text-gray-300">State Management:</strong> TanStack Query for server state.
                </li>
                <li>
                  <strong className="text-gray-300">API Calls:</strong> Axios for HTTP requests.
                </li>
                <li>
                  <strong className="text-gray-300">Structure:</strong> Reusable hooks, services, and contexts.
                </li>
                <li>
                  <strong className="text-gray-300">3D:</strong> React-Three-Fiber and Three.js for 3D graphics.
                </li>
                <li>
                  <strong className="text-gray-300">Styling:</strong> Tailwind CSS and shadcn ui for styling, layout and components.
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        <Separator className="my-16 bg-neutral-800" />

        {/* Call to Action Section */}
        <motion.section className="text-center" aria-labelledby="cta-heading" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} transition={{ duration: 0.6 }}>
          <h2 id="cta-heading" className="text-3xl font-bold">
            Explore Ripground
          </h2>
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          >
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">Built in just two weeks, Ripground is both a learning journey and a showcase of scalable web architecture for interactive browser games. Try it out and experience how games can be delivered seamlessly in the browser.</p>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="mt-8">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold" asChild>
                <Link to="/">Go to Homepage</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
}