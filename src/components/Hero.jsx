const Hero = ({user}) => {
  return (
    <div className="hero">
      <h2>Welcome, {user.name}!</h2>
    </div>
  );
};

export default Hero;
