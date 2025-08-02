const Card = () => {
  return (
    <div className="rounded-lg border-2 h-[450px] w-[350px] border-gray-300 p-4 m-auto mt-20">
      <header className="border-b-2 border-gray-300 pb-2 mb-4">
        <h3>Demo Heading</h3>
      </header>

      <section>
        <h2>Title: Demo</h2>
        <div>
          <p>discription</p>
        </div>
        <div>
          <button>tags</button>
        </div>
        <div>added on date</div>
      </section>
    </div>
  );
};

export default Card;
