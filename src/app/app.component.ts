import { Component, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	title = 'angular-testjaa';
	constructor(
		private router: Router,
		private titleService: Title,
		private route: ActivatedRoute,
	) { }

	/*
	เปลี่ยน title ตามที่ตั้งไว้ใน [ชื่อ].component.ts 
	'title' = 'ชื่อ'
 */
	ngOnInit(): void {

		// this.router.navigate([''])

		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				map(() => {
					const child: ActivatedRoute | null = this.route.firstChild;
					let title = child && child.snapshot.data['title']; // หาตัวแปร title ที่ประกาศไว้ใน [ชื่อ].component.ts 
					if (title) {
						return title;
					}
				})
			)
			.subscribe((title) => {
				if (title) {
					this.titleService.setTitle(`${title} - KONKAMON`);
				}
			});
	}

}
