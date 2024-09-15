import { Link } from "react-router-dom";
import MaxWidthWrapper from "../components/MaxWidthWrapper";
import splitString from "./split";
import { motion } from "framer-motion";

// Sample header text
const header1 = "PERFORMANCE";
const header2 = "TESTING WEBSITE";
const withText = "with";
const jmeterText = "JMETER";
const description =
  "For software testers, reducing the time spent on reporting is crucial to enhance both the efficiency and quality of testing. Here are methods and tools that can help make reporting faster.";

// Animation variants
const charVariants = {
  hidden: { opacity: 0 },
  reveal: { opacity: 1 },
};

const containerVariants = {
  hidden: {},
  reveal: {
    transition: {
      staggerChildren: 0.5, // Stagger children with 0.1 second delay
    },
  },
};
export default function Home() {
  // Split text into characters
  const header1_Chars = splitString(header1);
  const header2_Chars = splitString(header2);
  const with_Chars = splitString(withText);
  const jmeter_Chars = splitString(jmeterText);
  const desription_Chars = splitString(description);

  return (
    <div className="relative w-full h-screen bg-[radial-gradient(circle_at_right,_#150c24_10%,_#0d0718_40%,_#000000_90%)] text-white">
      <img
        src="/bg.png"
        className="w-1/2 h-full object-cover absolute top-0 right-0"
        alt="Background"
      />
      <MaxWidthWrapper>
        <div className="flex items-center h-full">
          <div>
            <h1 className="absolute top-6 left-10 text-4xl font-bold">
              UI FLOW
            </h1>

            <motion.h3
              initial="hidden"
              whileInView="reveal"
              viewport={{ once: true }}
              variants={containerVariants} // Apply container variants
              className="text-6xl font-bold bg-gradient-to-r from-[#7245eb] to-[#da8777] bg-clip-text text-transparent"
            >
              {header1_Chars.map((char, index) => (
                <motion.span
                  key={index}
                  transition={{ duration: 0.1, delay: index * 0.08 }}
                  variants={charVariants}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h3>

            <motion.h3
              initial="hidden"
              whileInView="reveal"
              viewport={{ once: true }}
              variants={containerVariants} // Apply container variants
              className="text-6xl font-bold bg-gradient-to-r from-[#7245eb] to-[#da8777] bg-clip-text text-transparent"
            >
              {header2_Chars.map((char, index) => (
                <motion.span
                  key={index}
                  transition={{ duration: 0.1, delay: index * 0.08 }}
                  variants={charVariants}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h3>

            <motion.p
              initial="hidden"
              whileInView="reveal"
              viewport={{ once: true }}
              variants={containerVariants} // Apply container variants
              className="text-3xl font-semibold text-white mt-10 ml-20 flex items-end"
            >
              {with_Chars.map((char, index) => (
                <motion.span
                  key={index}
                  transition={{ duration: 0.1, delay: index * 0.15 }}
                  variants={charVariants}
                >
                  {char}
                </motion.span>
              ))}
              <motion.h3
                initial="hidden"
                whileInView="reveal"
                viewport={{ once: true }}
                variants={containerVariants} // Apply container variants
                className="text-6xl font-semibold text-white ml-6"
              >
                {jmeter_Chars.map((char, index) => (
                  <motion.span
                    key={index}
                    transition={{ duration: 0.1, delay: index * 0.09 }}
                    variants={charVariants}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h3>
            </motion.p>

            <motion.p
              initial="hidden"
              whileInView="reveal"
              viewport={{ once: true }}
              variants={containerVariants} // Apply container variants
              className="text-[#7c7c7c] w-[500px] text-xl font-semibold mt-10 mb-8"
            >
              {desription_Chars.map((char, index) => (
                <motion.span
                  key={index}
                  transition={{ duration: 0.1, delay: index * 0.01 }}
                  variants={charVariants}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
            <Link to="/edit">
              <button className="btn_hover1 py-4 px-10">Get Started</button>
            </Link>
          </div>
          <div>{/* You can add more content here */}</div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
