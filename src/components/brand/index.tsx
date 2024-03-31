import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { useDeleteBrandMutation } from "../../redux/backendApi";

import { AlertDeleteBrandPopup, ConfirmDeleteBrandPopup } from "../../components";

import cs from "../../scss/helpers.module.scss";
import s from "./brand.module.scss";
import Bin from "../../../public/img/default/bin.svg";
import Edit from "../../../public/img/default/edit.svg";

type BrandProps = {
  obj: FeaturedCompanyType;
  isEditable?: boolean;
  refetch?: () => void;
};

export const Brand: React.FC<BrandProps> = ({ obj, isEditable = false, refetch }) => {
  const [isShowAlertDelete, setIsShowAlertDelete] = React.useState(false);
  const [isShowConfirmDelete, setIsShowConfirmDelete] = React.useState(false);

  const [deleteBrand, { isError, isSuccess, reset }] = useDeleteBrandMutation();

  // **
  const { data: session } = useSession();
  let isAuthor = false;

  if (session && isEditable) {
    const userId = session.user.id;

    if (userId) {
      isAuthor = true;
    }
  }

  // **
  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsShowConfirmDelete(true);
  };

  const onConfirmDelete = (value: boolean) => {
    setIsShowConfirmDelete(false);

    if (value) {
      deleteBrand(obj.id);
    }
  };

  // **
  React.useEffect(() => {
    if (isError) {
      setIsShowAlertDelete(true);
    }

    if (isSuccess) {
      refetch && refetch();
    }

    reset();
  }, [isError, isSuccess]);

  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        <Link href={obj.linkUrl} target="_blank">
          <Image src={obj.imageUrl} alt={obj.title} className={s.image} fill sizes="160px" />
        </Link>

        {isAuthor && (
          <div className={`${s.toolbar} ${cs.toolbar}`}>
            <Link
              href={`/dashboard/change/brands/${obj.id}`}
              className={cs.toolbarBtn}
              aria-label="Edit brand.">
              <Edit aria-hidden="true" />
            </Link>

            <button className={cs.toolbarBtn} aria-label="Delete brand." onClick={onDeleteClick}>
              <Bin aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {isShowConfirmDelete && (
        <ConfirmDeleteBrandPopup onConfirmClick={(value) => onConfirmDelete(value)} />
      )}

      {isShowAlertDelete && (
        <AlertDeleteBrandPopup onAlertClick={() => setIsShowAlertDelete(false)} />
      )}
    </div>
  );
};
