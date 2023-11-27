import React from "react";
import { Helmet } from "react-helmet-async";
export const SEO = ({ title, description, name, image }) => {
  const removeTags = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.body.textContent || "";
  };

  const descriptionTagRemove = removeTags(description);
  const defualtImage = "https://social.pensook.com/pensook-photo-link.png";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={descriptionTagRemove} />
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={descriptionTagRemove} />
      <meta property="og:image" content={image ? image : defualtImage} />
      <meta
        property="og:image:secure_url"
        content={image ? image : defualtImage}
      />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="640" />
      <meta property="og:image:type" content="image/png" />
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:creator" content={image ? image : defualtImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={descriptionTagRemove} />
      {/* End Twitter tags */}
    </Helmet>
  );
};
