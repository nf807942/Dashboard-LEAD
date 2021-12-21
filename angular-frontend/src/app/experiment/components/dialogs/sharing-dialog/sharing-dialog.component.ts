import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExperimentService } from 'src/app/experiment/services/experiment.service';
import { saveAs } from "file-saver";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-sharing-dialog',
  templateUrl: './sharing-dialog.component.html',
  styleUrls: ['./sharing-dialog.component.scss']
})
export class SharingDialogComponent implements OnInit {

  link: string;
  qrcode: any;
  file: any;

  constructor(
    public dialogRef: MatDialogRef<SharingDialogComponent>,
    private experimentService: ExperimentService,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }
  
  ngOnInit(): void {
    this.link = this.experimentService.getExperimentSharingLink(this.data);

    this.experimentService.getExperimentQR(this.data).subscribe((data) => {
      this.file = data;
      data.text().then(str => {
        this.qrcode = this.sanitizer.bypassSecurityTrustHtml(str);
      })
    });
  }

  download(): void {
    saveAs(this.file, 'qrcode.svg')
  }

  close(): void {
    this.dialogRef.close();
  }
}
