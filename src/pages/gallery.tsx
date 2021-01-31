import { gql, useQuery } from "@apollo/client";
import { CardContent, Grow, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card/Card";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import BreakpointMasonry from "../components/util/BreakpointMasonry";

const useStyles = makeStyles({
  tightCardContent: {
    padding: "4px 10px !important",
    "&:last-child": {
      padding: 0,
    },
    "& > *": {
      margin: 0,
    },
  },
  card: {
    margin: "1em 0",
  },
});

const getPublications = gql`
  query getPublications {
    publications(where: { publication_type: { _eq: "gallery" } }) {
      id
      display_name
      publication_date
      comment
      file {
        id
        s3_path
      }
    }
  }
`;

const HideLoading: React.FC<{
  elementRef: React.MutableRefObject<HTMLElement>;
  transitionClass?(...args: any[]): JSX.Element;
}> = ({ children, elementRef, transitionClass }) => {
  const [loaded, setLoaded] = useState(false);

  const onLoaded = () => setLoaded(true);

  useEffect(() => {
    const current = elementRef.current;
    if (current) {
      current.addEventListener("load", onLoaded);
      return () => current.removeEventListener("load", onLoaded);
    }
  }, [elementRef]);

  const EffectiveTransitionClass = transitionClass;

  return (
    <div role="presentation" style={loaded ? null : { display: "none" }}>
      <EffectiveTransitionClass in={loaded}>
        {children}
      </EffectiveTransitionClass>
    </div>
  );
};

const PublicationCard = ({ publication }) => {
  const classes = useStyles();
  const imgRef = useRef<HTMLImageElement>(null);

  return (
    <HideLoading elementRef={imgRef} transitionClass={Grow}>
      <Card className={classes.card}>
        <CardMedia
          image={
            "https://olivier-desforges.herokuapp.com/" + publication.file.id
          }
          title={publication.display_name}
          component="img"
          ref={imgRef}
        />
        <CardContent classes={{ root: classes.tightCardContent }}>
          <Typography gutterBottom variant="h6" component="h3">
            {publication.display_name}
          </Typography>
        </CardContent>
      </Card>
    </HideLoading>
  );
};

const Gallery = () => {
  const classes = useStyles();
  const { data, loading, error } = useQuery(getPublications);

  return (
    <BreakpointMasonry>
      {loading ? (
        <p>Loading</p>
      ) : error ? (
        <p>{JSON.stringify(error)}</p>
      ) : !data ? (
        <p>No data</p>
      ) : (
        data.publications.map((publication) => (
          <PublicationCard key={publication.id} publication={publication} />
        ))
      )}
    </BreakpointMasonry>
  );
};

const GalleryPage = () => (
  <Layout>
    <Gallery />
  </Layout>
);

export default GalleryPage;
