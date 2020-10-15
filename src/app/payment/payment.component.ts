import {Component, OnInit, NgModule, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DriverSearchService} from '../service/driver-search.service';
import {FineBill} from '../dto/FineBill';
import {BrowserService} from '../service/browser.service';
import {DeviceDetectorService} from 'ngx-device-detector';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  Dlno: string = '';
  DD: any;
  BB: any;
  tableBill: any;
  arrest: any;
  loadingStatus = false;
  Bill: any;
  fineBilllist: Array<FineBill> = [];
  selectedBill = null;
  hoverBill = null;
  today = new Date().toISOString().slice(0,10);
  ipAddress: string;
  country: string;
  deviceInfo = null;
  isMobilevar = false;
  isTabletvar = false;
  isDesktopvar = false;
  device = '';
  @ViewChild('frmDriver', {static: false}) frmDriver: NgForm;

  constructor(private DriverSearch: DriverSearchService,
              private ip: BrowserService,
              private deviceService: DeviceDetectorService) {
    this.getIP();
    this.getCountry();
    this.detectDevice();
    this.isMobile();
    this.isTablet();
    this.isDesktop();
  }

  ngOnInit() {
    console.log(this.device);
  }

  async getIP() {
    this.ip.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ip;
      console.log(this.ipAddress);
    });
  }
  async getCountry() {
    this.ip.getCountry().subscribe((res: any) => {
      this.country = res.country;
      console.log(this.country);
    });
  }
  async  detectDevice() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    console.log(this.deviceInfo);
  }

  public isMobile() {
    this.isMobilevar = this.deviceService.isMobile();
    if (this.isMobilevar) {
      this.device = 'Mobile';
    }
  }

  public isTablet() {
    this.isTabletvar = this.deviceService.isTablet();
    if(this.isTabletvar){
      this.device = 'Tablet';
    }
  }

  public isDesktop() {
    this.isDesktopvar = this.deviceService.isDesktop();
    if(this.isDesktopvar){
      this.device = 'Desktop';
    }
  }

  onClickRow(BillSelect: FineBill): void {

    this.selectedBill = BillSelect;

  }

  searcdriverh() {

    this.loadingStatus = false;
    this.tableBill = false;
    this.DD = false;
    this.BB = false;
    this.arrest = false;
    if (this.frmDriver.valid) {
      this.DriverSearch.searchDriverNo(this.Dlno).subscribe(resp => {
        if (resp === 'Driver not Found') {
          this.DD = true;
          this.BB = false;
          this.tableBill = false;
          return;
        }

        if (resp === 'Bill not Found') {
          this.BB = true;
          this.DD = false;
          this.tableBill = false;
          return;
        }
        // this.loadingStatus = true;
        this.Bill = resp;
        if (this.Bill.Dtype === 'bad') {
          this.arrest = true;
          return;
        }
        this.fineBilllist = [];
        this.loadingStatus = true;
        setTimeout(() => {
          this.loadingStatus = false;
          this.tableBill = true;
          this.DD = false;
          this.BB = false;
          this.arrest = false;
          this.fineBilllist = this.Bill.bill;
        }, 2000);
      }, error1 => {
        alert('Network Error');
        console.log(error1);
      });
    }
  }

  async payBill(selectBill: FineBill) {

    const Payment = {
      country: this.country,
      ClientIP: this.ipAddress,
      Browser: this.deviceInfo,
      device: this.device,
      billRefNo: selectBill.fine_id,
      fullPrice: selectBill.price
    };
    if (confirm('Are you sure Pay E-fine Bill')) {
      this.DriverSearch.EfinePay(Payment).subscribe(res => {
          // console.log(res);
          alert('Payment successfully');
          const index = this.fineBilllist.indexOf(selectBill);
          this.fineBilllist.splice(index, 1);
          // medin ain karanna one nam splice danna one, agin ain karanna one nam pop
          // this.selectedBill = new FineBill('', '', '', '', '');

        },
        error1 => {
          alert('Network Error');
          console.log(error1);
        });
    }

  }




}
