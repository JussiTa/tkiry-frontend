import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useAuthContext } from "../features/auth/hooks/use-auth-context";
import { useLotlistCustomer } from "../features/lotlists-customers/hooks/use-customer-lotlist";
import type { LotList } from "../features/api/types";
import { Card, Grid, Typography } from "@mui/joy";

export function CreateLotList() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [appIsLoading, setAppIsLoading] = useState(true);
  const { me } = useAuthContext();
  const { isAuthenticated } = useAuthContext();
  const { createLotList } = useLotlistCustomer();
  const mutation = useMutation({
    mutationFn: async () => {
      const lotList: LotList = {
        title: title,
        startDate: startDate,
        endDate: endDate,
      };
      return await createLotList(lotList);
    },
  });

  useEffect(() => {
    me()
      .catch(() => {})
      .finally(() => setAppIsLoading(false));
  }, []);

  if (appIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card>
        <Grid container direction="column" spacing={2}>
          {isAuthenticated ? (
            <Grid xs={4} md={3}>
              {mutation.isPending ? (
                "Adding lotlist..."
              ) : (
                <>
                  {mutation.isError ? (
                    <div>
                      Listan luonti epäonnistui: {mutation.error.message}
                    </div>
                  ) : null}

                  {mutation.isSuccess ? <div>Lista lisätty!</div> : null}

                  <Grid xs={4} md={30}>
                    <label>Listan alkamispäivä</label>
                    <input
                      placeholder="vvvv-kk-pp"
                      type="text"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </Grid>

                  <Grid xs={4} md={30}>
                    <label>Listan päättymispäivä</label>
                    <input
                      placeholder="vvvv-kk-pp"
                      type="text"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </Grid>

                  <Grid xs={4} md={20}>
                    <label>Listan nimi</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid xs={4} md={20}>
                    <button
                      onClick={() => {
                        mutation.mutate();
                      }}
                    >
                      Luo lista
                    </button>
                  </Grid>
                </>
              )}
            </Grid>
          ) : (
            <Typography fontSize="100px" textColor="red">
            401
          </Typography>
          )}
        </Grid>
      </Card>
    </>
  );
}
