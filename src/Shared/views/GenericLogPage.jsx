function GenericLogPage({ pageTitle, entries }) {
  function formatLocalDateTime(isoString) {
    if (!isoString) return "—";

    const date = new Date(isoString);

    const pad = (n) => String(n).padStart(2, "0");

    return `${pad(date.getDate())}/${pad(
      date.getMonth() + 1
    )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(
      date.getMinutes()
    )}:${pad(date.getSeconds())}`;
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold underline text-center">{pageTitle}</h2>

      {entries.map((entry) => (
        <details key={entry.id} className="bg-white/80 rounded-lg p-3 shadow">
          <summary className="cursor-pointer font-medium">
            {entry.title}
          </summary>

          <div className="mt-2 text-sm flex flex-col gap-1">
            <span>
              <strong>Start:</strong> {formatLocalDateTime(entry.startAt)}
            </span>

            <span>
              <strong>End:</strong>{" "}
              {entry.endAt ? formatLocalDateTime(entry.endAt) : "In Progress"}
            </span>

            {entry.energyChange != null && (
              <span>
                <strong>Energy Change:</strong>{" "}
                {entry.energyChange > 0 ? "+" : ""}
                {entry.energyChange}
              </span>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

export default GenericLogPage;
