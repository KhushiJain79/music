import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Music for everyone. Discover, stream, and share a constantly expanding mix of music from emerging and major artists around the world.
          </p>
        </section>

        {/* Company Overview */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/09/Spotify-logo.png"
            alt="Spotify"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-semibold mb-2">Who We Are</h2>
            <p className="text-gray-400">
              Spotify is the world’s most popular audio streaming subscription service with hundreds of millions of users globally. Our mission is to unlock the potential of human creativity—by giving a million creative artists the opportunity to live off their art and billions of fans the opportunity to enjoy and be inspired by it.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: "Innovation", desc: "Pushing boundaries to create a better listening experience." },
              { title: "Diversity", desc: "Empowering people from every background to be heard." },
              { title: "Sustainability", desc: "Building a future that’s as sustainable as it is musical." },
              { title: "Community", desc: "Connecting people through shared passions and stories." },
            ].map((value, idx) => (
              <div key={idx} className="bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
          <p className="text-gray-300 mb-6">Whether you're an artist, fan, or collaborator—Spotify has a place for you.</p>
          <a
            href="/careers"
            className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full transition"
          >
            Explore Careers
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;