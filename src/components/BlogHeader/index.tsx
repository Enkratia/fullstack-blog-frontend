import React from "react";
import Link from "next/link";
import Image from "next/image";

import { formatDate } from "@/utils/customFunctions";

import cs from "../../scss/helpers.module.scss";
import s from "./BlogHeader.module.scss";

const post = {
  id: 1,
  title: "Step-by-step guide to choosing great font pairs",
  category: "startup",
  firstName: "John",
  lastName: "Doe",
  createdAt: "2023-11-03T17:44:30.644Z",
  updatedAt: "2023-11-03T17:44:30.644Z",
  text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  imageUrl:
    "https://s3-alpha-sig.figma.com/img/ffdd/fb94/98174abefa2a086436f620be49d2f85c?Expires=1699833600&Signature=if1TexCLIeTWV6k8yHI9J7UGHThFUEqezGPuqYrKkauuPXzP30TN1sJ88TAWzXCLHL2MOEO3TsDeaisJNF9aK2KuCVq-QU-iZJ5eiH7RmUJKOVGlcUS6o7H237xlExHVbThSxKaOcfXTuua-wyXQuwcuJR3JlZtJv9vJMWBT1APRXqA6pgZO0GIoMvTnTFbZY4R03RukOXnszQ2hPiS4HYBEr9vn3fueMsDMKME23TxhfWF~C9jzt9xv0nGKUV5y-9WDcinmHWj2KKgh1-vkGxYSm54QByiXjLMDPDlrhfN8ja~~9VSNIUkwe~J49o9vxcdxTslTA1d3ilgYWnqcrg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  tags: ["business", "experience"],
  isFeatured: true,
  authorId: 1,
};

export const BlogHeader: React.FC = () => {
  return (
    <section className={s.root}>
      <h2 className={cs.srOnly}>{`Featured post: ${post.title}`}</h2>

      <div className={`${s.container} ${cs.container}`}>
        {/* <div className={s.left}>
          <span className={s.subtitle}>Featured post</span>
          <h3 className={`${s.title} ${cs.title}`}>{post.title}</h3>

          <div className={s.metadata}>
            <span className={s.metadataItem}>
              By
              <Link
                href={`/users/${post.authorId}`}
                className={s.metadataName}>{` ${post.firstName} ${post.lastName}`}</Link>
            </span>
            <span className={s.metadataItem}>{formatDate(post.createdAt)}</span>
          </div>

          <p className={s.text}>{post.text}</p>
          <Link href={`/blog/${post.id}`} className={`${s.link} ${cs.btn}`}>{`Read More >`}</Link>
        </div> */}

        <div className={s.right}>
          <div className={s.imageWrapper}>
            {/* <Image
              src={post.imageUrl}
              alt={post.title}
              width={1280}
              height={515}
              // fill
              sizes="(min-width: 1260px) 515px, (min-width: 1000px) calc(91.25vw - 617px), calc(100vw - 684px)"
              // layout="intrinsic"
              className={s.image}
            /> */}
            {/* </div> */}

            {/* <div style={{ position: "relative", maxWidth: "1280px", paddingTop: "56.25%" }}> */}
            {/* <Image
              src={post.imageUrl}
              alt="Picture of the author"
              // fill
              // sizes="(min-width: 1280px) 1280px, (min-width: 1000px) calc(91.25vw - 617px), calc(100vw - 684px)"
              // style={{
              //   objectFit: "contain",
              // }}
            /> */}

            {/* <img src={post.imageUrl} /> */}
            {/* <Image
              src={post.imageUrl}
              alt="Picture of the author"
              width={2250}
              height={1500}
              sizes="100vw"
              // sizes="(min-width: 1280px) 1280px, (max-width: 1000px) calc(91.25vw - 300px)"
              // sizes="50vw"
              style={{
                width: "100%",
                height: "auto",
                // className={s.image}
              }}
              // fill
            /> */}

            {/* <Image
              src={post.imageUrl}
              alt="Picture of the author"
              width={2250}
              height={1500}
              sizes="(max-width: 920px) 100vw, 33vw"
              style={{
                width: "100%",
                height: "auto",
              }}
            />

            <Image
              src={post.imageUrl}
              alt="Picture of the author"
              width={2250}
              height={1500}
              sizes="(max-width: 920px) 100vw, 33vw"
              style={{
                width: "100%",
                height: "auto",
              }}
            /> */}

            <Image
              src={post.imageUrl}
              alt="Picture of the author"
              width={2250}
              height={1500}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
