import React from 'react';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import '../styles/ModalWindows.css';
import { FormState } from '../interfaces/interfaces';

interface ModalWindowProps {
  visible: boolean;
  onClose: () => void;
  offer: FormState | undefined;
  depositName: string | undefined;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({
  onClose,
  visible,
  depositName,
  offer,
}: ModalWindowProps): React.ReactElement => {
  return (
    <>
      <Dialog
        open={visible}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle>
          Предложение от банка
          <span className="no-print">
            <IconButton
              onClick={() => {
                onClose();
              }}
              color="secondary"
              aria-label="close"
            >
              <CloseOutlined style={{ fontSize: 26 }} color="primary" />
            </IconButton>
          </span>
        </DialogTitle>
        <DialogContent className="printing-info">
          <Typography>
            <p>Тип депозита: {depositName}</p>
          </Typography>
          <Typography>
            <p>Срок: {offer?.period} дней </p>
          </Typography>
          <Typography>
            <p>Сумма: {offer?.summ} руб.</p>
          </Typography>
          <Typography>
            <p>Процентная ставка: {offer?.rate} %</p>
          </Typography>
          <Typography>
            <p>Доход: {offer?.profit} руб.</p>
          </Typography>
        </DialogContent>
        <DialogActions>
          <span className="no-print">
            <Button
              variant={'contained'}
              color={'primary'}
              onClick={() => window.print()}
            >
              Печать
            </Button>
          </span>
        </DialogActions>
      </Dialog>
    </>
  );
};
