function InProgressScreen() {
  return (
    <>
      <h2 className="text-xl font-semibold underline text-center">
        In Progress
      </h2>
      {/* Example long content */}
      <div className="space-y-4 mt-4">
        {[...Array(20)].map((_, i) => (
          <p key={i}>Scrollable content line {i + 1}</p>
        ))}
      </div>
    </>
  );
}

export default InProgressScreen;
