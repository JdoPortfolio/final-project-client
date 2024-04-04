// Inside HomePage.jsx or a similar component
import '../HomePage.css'
import { Container, Row, Col } from "react-bootstrap"; // Assuming you're using React Bootstrap
import DealershipCard from "../components/DealershipCard";
import UserCard from "../components/UserCard";
import { useDealership } from "../context/DealershipContext";


const HomePage = () => {
  // Using the Dealership context to fetch and access dealerships
  const { dealerships, isLoading, refreshDealerships } = useDealership();
  // Mapping dealership names to testimonials
  const dealershipTestimonials = {
    "Gabriel Cotto Toyota Dealership":
      `"Partnering with KonduceAuto has revolutionized how we connect with the Hispanic market. Their seamless translation services and culturally attuned customer support have significantly increased our outreach and customer satisfaction rates."`,
    "Fernando Ortiz Honda Dealership":
      `"KonduceAuto’s dedication to bridging the language gap has not only expanded our customer base but also enriched our dealership with diversity. Their tailored approach has made all the difference."`,
    "Margaret Suarez Ford Dealership":
      `"The intuitive platform and Spanish-speaking service team from KonduceAuto have been game-changers in how we interact with our clients. We've seen a noticeable uptick in engagement since joining."`,
    "Katherin Rivera Kia Dealership":
      `"Working with KonduceAuto has opened up new avenues for us to connect with Spanish-speaking customers. Their dedicated subdomains have made car shopping accessible for many."`,
  };



  // Loading indicator
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      
      <section id="home-banner" className="home-banner">
        <Container className="text-center" >
          <h1 className="display-1 banner-title">
            Bridging Dreams Across Languages: Your Car, Su Vehículo
          </h1>
          <p className="display-3 text-light">
            KonduceAuto.com: Uniting Car Dealerships with the Hispanic
            Community. Discover, Negotiate, and Purchase Your Next Car - Todo en
            Español.
          </p>
        </Container>
      </section>

      <section id="about-us" className="about-us">
        <Container className="text-center">
          <h2 className='display-1'>About Us</h2>
          <p className='display-6'>
            At KonduceAuto.com, we're bridging cultures by connecting the
            Hispanic community with car dealerships in a language that resonates
            with them—Spanish. Born from the need to make car buying accessible
            and inclusive, our platform is the go-to destination for
            Spanish-speaking customers to discover, negotiate, and purchase cars
            with ease. We're not just translating words; we're fostering
            understanding and respect, ensuring every interaction feels like
            home. Our commitment extends to dealerships as well, offering them a
            unique opportunity to reach a vibrant and growing market through a
            tailored online presence. By uniting under the KonduceAuto.com
            banner, we're creating a seamless bridge between two worlds—driving
            forward together towards a future where every car buyer feels valued
            and understood, regardless of language.
          </p>
        </Container>
      </section>

      <section id="our-partners" className="our-partners">
        <Container className="text-center">
          <h2 className='display-3'>
            Meet Our Esteemed Partners – Their Success Stories with KonduceAuto
          </h2>
          {/* Dynamically generate partner sections here */}
          {dealerships.map((dealership) => (
            <Row className="mb-5" key={dealership._id}>
              <Col lg={6} md={12}>
                <DealershipCard
                  dealership={dealership}
                  canUpdate={false}
                  canDelete={false}
                />
              </Col>
              <Col lg={6} md={12}>
                <UserCard
                  user={dealership.owner}
                  canUpdate={false}
                  canDelete={false}
                />
              </Col>
              <Col lg={12} className="mt-3">
                <p className='display-6'>
                  {dealershipTestimonials[dealership.name] ||
                    "This dealership's testimonial is coming soon."}
                </p>
                <a
                  href={`/dealerships/${dealership._id}`}
                  className="btn btn-primary"
                >
                  Go to site
                </a>
              </Col>
            </Row>
          ))}
        </Container>
      </section>

      <section id="join-us" className="join-us">
        <Container className="text-center">
          <h2 className='display-1'>Join KonduceAuto Today</h2>
          <h3 className='display-3'>Your gateway to the Hispanic market awaits!</h3>
          <p className='display-6'>
            Join forces with KonduceAuto and let's drive your dealership into a
            future rich with opportunity and connection. Our platform is the key
            to unlocking a passionate, Spanish-speaking customer base, eager for
            a buying experience that speaks directly to them.
          </p>
          <h3 className='display-3'>Take the next step:</h3>
          <p className='display-6'>
            Email us at partners@konduceauto.com, and our team will respond
            within 24 hours to get your journey started. With KonduceAuto,
            you're not just expanding your market — you're revolutionizing the
            car buying experience.
          </p>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
