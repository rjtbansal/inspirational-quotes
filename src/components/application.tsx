import { useState } from 'react';
import Quotes from './quotes';
import InspirationalQuote from './quote';
import Loading from './loading';

export type Quote = {
  id: number;
  content: string;
  source?: string;
};

export const fetchRandomQuote = async () => {
  const response = await fetch(`/api/quotes/random`);
  return response.json();
};

export const fetchQuotes = async (count: number) => {
  const response = await fetch(`/api/quotes?limit=${count}`);
  return response.json();
};

const Application = () => {
  // specifying array of Quote as type else without it, TS will think quotes is of type never
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [count, setCount] = useState(10);

  if (!quotes) return <Loading />;
  return (
    <main className="mx-auto w-full max-w-2xl py-16">
      <Quotes count={count} onSubmit={() => fetchQuotes(count).then(setQuotes)}>
        {quotes.map((quote) => (
          <InspirationalQuote
            key={quote.id}
            content={quote.content}
            source={quote.source}
          />
        ))}
      </Quotes>
    </main>
  );
};

export default Application;
