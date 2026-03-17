import fs from "fs";

const batchSize = 10;
const totalPages = 2217;
const allItems = [];
console.time(`time taken:`);

for (let i = 1; i <= totalPages; i += batchSize) {



    const batch = [];
    for (let page = i; page < i + batchSize && page <= totalPages; page++) {



        batch.push(
            (async () => {
                let attemps = 0;
                let res;
                while (attemps < 3) {
                    try {
                        res = await fetch(`https://backend.delhimetrorail.com/api/v2/en/lost_found_items/?page=${page}`);
                        if (res.ok) break;

                        console.error(res)
                        throw new Error(`Failed page ${page}`);
                    }
                    catch (error) {
                        console.error(error)
                        attemps++;
                        continue;
                    }



                }
                if (!res?.ok) {
                    throw new Error(`Failed page ${page}`);
                }

                return res.json();
            })()
        )

    }

    const results = await Promise.all(batch);

    for (const data of results) {
        allItems.push(...data.results);

    }
}

console.log(allItems.length);


fs.writeFileSync(
    new URL("./allItems.json", import.meta.url),
    JSON.stringify(allItems, null, 2),
    `utf-8`
);

const lastUpdated = {
    date: new Date().toISOString()
};

fs.writeFileSync(
    new URL("./lastUpdated.json", import.meta.url),
    JSON.stringify(lastUpdated, null, 2),
    "utf-8"
);

console.timeEnd(`time taken:`);
