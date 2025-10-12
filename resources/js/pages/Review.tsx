import { Head, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  profession: string;
  stars: number;
  review: string;
  photo?: string;
}

export default function Review() {
  const page = usePage<{ testimonials: Testimonial[] }>();
  const testimonials = page.props.testimonials;

  return (
    <>
      <Head title="Testimonial - Estwo Computer" />

      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Reviews from Our Valued Customers
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md p-6 text-center flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border">
                <img
                  src={
                    item.photo
                      ? `/storage/${item.photo}`
                      : "https://via.placeholder.com/150"
                  }
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>

              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2">{item.profession}</p>

              <div className="flex justify-center mb-2">
                {Array.from({ length: item.stars }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-gray-600 italic mt-2">"{item.review}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
